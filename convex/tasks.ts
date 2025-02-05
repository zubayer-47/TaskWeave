import { v } from "convex/values";
import { mutation, MutationCtx, query } from "./_generated/server";
import { taskPrioritySchema, taskStatusSchema } from "./schemaTypes";

export const getTasks = query({
  args: {},
  handler: async (ctx) => {
    const tasks = await ctx.db.query("tasks");
    return tasks;
  },
});

export const createTask = mutation({
  args: {
    project_id: v.id("projects"),
    stage_id: v.id("stages"),
    title: v.string(),
    description: v.optional(v.string()),
    status: taskStatusSchema(),
    priority: taskPrioritySchema(),
    assignees: v.array(v.id("users")),
  },
  handler: async (
    ctx,
    { title, description, stage_id, assignees, priority, status, project_id },
  ) => {
    try {
      // check if task with this title already exists
      await checkUniqueTitle(ctx, title);

      // fetch all tasks to get the highest position
      const tasks = await ctx.db.query("tasks").collect();
      const maxPosition = tasks.reduce((max, task) => {
        return Math.max(max, task.position || 0);
      }, 0);

      const taskId = await ctx.db.insert("tasks", {
        project_id,
        stage_id,
        title,
        description,
        status,
        priority,
        assignees,
        position: maxPosition + 1,
      });

      return { success: true, message: "Task created successfully!", taskId };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      //   if (error?.message.includes("already exists")) {
      //     return { success: false, message: "Task title must be unique." };
      //   }

      // Handle unexpected errors
      console.error("Error creating task:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  },
});

export const updateTask = mutation({
  args: {
    id: v.id("tasks"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    status: v.optional(taskStatusSchema()),
    priority: v.optional(taskPrioritySchema()),
    assignees: v.optional(v.array(v.id("users"))),
  },
  handler: async (
    ctx,
    { id, title, description, status, priority, assignees },
  ) => {
    try {
      if (title) {
        // check if task with this title already exists
        await checkUniqueTitle(ctx, title);
      }

      // patch update the task
      await ctx.db.patch(id, {
        title: title,
        description: description,
        status: status,
        priority: priority,
        assignees: assignees,
      });

      return { success: true, message: "Task updated successfully!" };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle unexpected errors
      console.error("Error updating task:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  },
});

export const updateTaskPosition = mutation({
  args: {
    taskId: v.id("tasks"),
    newStageId: v.id("stages"),
    newPosition: v.number(),
  },
  handler: async (ctx, { taskId, newPosition, newStageId }) => {
    try {
      await ctx.db.patch(taskId, {
        position: newPosition,
        stage_id: newStageId,
      });

      // adjust task position in new stage
      const tasksInNewStage = await ctx.db
        .query("tasks")
        .filter((q) => q.eq(q.field("stage_id"), newStageId))
        .collect();

      for (const task of tasksInNewStage) {
        if (task._id !== taskId && task.position >= newPosition) {
          await ctx.db.patch(task._id, {
            position: task.position + 1,
          });
        }
      }

      return { success: true, message: "Task position updated successfully!" };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle unexpected errors
      console.error("Error updating task position:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  },
});

export const deleteTask = mutation({
  args: {
    id: v.id("tasks"),
  },
  handler: async (ctx, { id }) => {
    try {
      // TODO:6/2, check user permissions before deletion
      await ctx.db.delete(id);
      return { success: true, message: "Task deleted successfully!" };
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      // Handle unexpected errors
      console.error("Error deleting task:", error);
      return { success: false, message: "An unexpected error occurred." };
    }
  },
});

// utils
async function checkUniqueTitle(ctx: MutationCtx, title: string) {
  try {
    const existingTask = await ctx.db
      .query("tasks")
      .withIndex("by_title", (q) => q.eq("title", title))
      .unique();

    if (existingTask) {
      throw new Error("A task with this title already exists.");
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error?.message.includes("already exists")) {
      return { success: false, message: "Task title must be unique." };
    }

    // handle unexpected errors
    console.error("Error checking unique task:", error);
    return { success: false, message: "An unexpected error occurred." };

    // pass the error to the caller
    // throw error;
  }
}

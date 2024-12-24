import { query } from "./_generated/server";

import { v } from "convex/values";
import { mutation } from "./_generated/server";
import { getUserByIndex } from "./users";

export const createProject = mutation({
  args: {
    clerk_id: v.string(),
    name: v.string(),
    description: v.optional(v.string()),
  },
  async handler(ctx, { clerk_id, name, description }) {
    const user = await getUserByIndex(ctx, clerk_id);

    if (!user) {
      throw new Error("Something went wrong. Please try again.");
    }

    // Step 1: Create the project
    const project = await ctx.db.insert("projects", {
      name,
      description,
      owner_id: user._id,
    });

    // Step 2: Assign the owner role
    //   await ctx.db.insert("roles", {
    //     projectId: project._id,
    //     userId: ownerId,
    //     role: "Owner", // Default role for the creator
    //   });

    return project;
  },
});

export const getProjects = query({
  handler: async (ctx) => {
    try {
      const projects = await ctx.db.query("projects").collect();

      return projects;
    } catch (error) {
      throw error;
    }
  },
});

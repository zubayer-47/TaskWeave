import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  stageNameSchema,
  taskPrioritySchema,
  taskStatusSchema,
} from "./schemaTypes";

export default defineSchema({
  users: defineTable({
    fullname: v.string(),
    username: v.string(),
    // username: v.any(),
    email: v.string(),
    // password: v.string(),
    gender: v.union(v.literal("MALE"), v.literal("FEMALE")),
    // gender: v.any(),
    avatar: v.string(),
    bio: v.string(),
    // tokenIdentifier: v.string(),

    clerk_id: v.string(),
  }).index("by_clerkId", ["clerk_id"]),
  // }).index("by_token", ["tokenIdentifier"]),

  projects: defineTable({
    name: v.string(),
    owner_id: v.id("users"),
    description: v.optional(v.string()),
  }).index("by_name", ["name"]),

  stages: defineTable({
    project_id: v.id("projects"),
    name: stageNameSchema(),
    // tasks: v.array(v.id("tasks")),
  }).index("by_project_id", ["project_id"]),

  tasks: defineTable({
    stage_id: v.id("stages"),
    project_id: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    status: taskStatusSchema(),
    priority: taskPrioritySchema(),
    assignees: v.array(v.id("users")),
    position: v.number(),
  })
    .index("by_stage_id", ["stage_id"])
    .index("by_title", ["title"])
    .index("by_position", ["stage_id", "position"]),
});

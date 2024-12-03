import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

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
    description: v.optional(v.string()),
    owner_id: v.id("users"),
  }).index("by_name", ["name"]),

  stages: defineTable({
    project_id: v.id("projects"),
    name: v.union(
      v.literal("TODO"),
      v.literal("IN_PROGRESS"),
      v.literal("In_Review"),
      v.literal("STUCK"),
      v.literal("COMPLETED"),
    ),
    // tasks: v.array(v.id("tasks")),
  }).index("by_project_id", ["project_id"]),

  tasks: defineTable({
    stage_id: v.id("stages"),
    project_id: v.id("projects"),
    title: v.string(),
    description: v.optional(v.string()),
    status: v.union(
      v.literal("TODO"),
      v.literal("IN_PROGRESS"),
      v.literal("In_Review"),
      v.literal("STUCK"),
      v.literal("COMPLETED"),
    ),
    priority: v.union(
      v.literal("URGENT"),
      v.literal("HIGH"),
      v.literal("MEDIUM"),
      v.literal("NORMAL"),
      v.literal("LOW"),
    ),
    assignees: v.array(v.id("users")),
  }).index("by_stage_id", ["stage_id"]),
});

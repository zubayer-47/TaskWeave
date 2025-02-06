import { v } from "convex/values";

export const stageNameSchema = () =>
  v.union(
    v.literal("TODO"),
    v.literal("IN_PROGRESS"),
    v.literal("In_Review"),
    v.literal("STUCK"),
    v.literal("COMPLETED"),
  );

export const taskStageSchema = () =>
  v.union(
    v.literal("TODO"),
    v.literal("IN_PROGRESS"),
    v.literal("In_Review"),
    v.literal("STUCK"),
    v.literal("COMPLETED"),
  );

export const taskPrioritySchema = () =>
  v.union(
    v.literal("URGENT"),
    v.literal("HIGH"),
    v.literal("MEDIUM"),
    v.literal("NORMAL"),
    v.literal("LOW"),
  );

// typescript types from convex
export type TaskStage = ReturnType<typeof taskStageSchema>;
export type TaskPriority = ReturnType<typeof taskPrioritySchema>;

import { UserJSON } from "@clerk/nextjs/server";
import { v } from "convex/values";
import { Doc, Id } from "./_generated/dataModel";
import {
  internalMutation,
  internalQuery,
  MutationCtx,
  query,
  QueryCtx,
} from "./_generated/server";

// export const store = mutation({
//   args: { clerkUser: v.any() },
//   handler: async (ctx, { clerkUser }: { clerkUser: UserJSON }) => {
//     const identity = await ctx.auth.getUserIdentity();
//     console.log({ clerkUser }, "customUserIdentity");

//     if (!identity) throw new Error("Unauthorized!");

//     // Check if the user is already stored in the database
//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier),
//       )
//       .unique();

//     if (user !== null) {
//       // If the user is already in the database but the name change,
//       // Patch the new name
//       console.log(user.fullname !== identity.name, "store 22");
//       if (user.fullname !== identity.name) {
//         await ctx.db.patch(user._id, {
//           fullname: identity.name,
//         });
//       }

//       return user._id;
//     }

//     // If it's a new user, we create a new one
//     return await ctx.db.insert("users", {
//       fullname: identity.name!,
//       avatar: identity.pictureUrl!,
//       bio: "",
//       username: identity.nickname!,
//       email: identity.email!,
//       gender: identity.gender === "male" ? "Male" : "Female",
//       tokenIdentifier: identity.tokenIdentifier,
//       // clerkUser: "",
//     });
//   },
// });

export const getUser = internalQuery({
  args: { subject: v.string() },
  async handler(ctx, args) {
    return await userQueryByClerkId(ctx, args.subject);
  },
});

export const updateOrCreateUser = internalMutation({
  args: { clerkUser: v.any() },
  async handler(ctx, args: { clerkUser: UserJSON }) {
    const identity = await ctx.auth.getUserIdentity();

    // if (!identity) throw new Error("Unauthorized!");

    const user = await userQueryByClerkId(ctx, args.clerkUser.id);
    if (user) {
      console.log(
        { clerkUser: args.clerkUser, identity },
        "updateOrCreateUser-xxxxx-UPDATING",
      );

      return await ctx.db.patch(user._id, {
        // clerkUser: args.clerkUser,
        fullname:
          `${args.clerkUser.first_name} ${args.clerkUser.last_name}` ||
          user.fullname,
        username: args.clerkUser.username || user.username,
        email: args.clerkUser.email_addresses[0].email_address || user.email,
        gender:
          (args.clerkUser.unsafe_metadata.gender as "MALE" | "FEMALE") ||
          user.gender,
        avatar: args.clerkUser.image_url || user.avatar,
        bio: (args.clerkUser.unsafe_metadata.bio as string) || user.bio,
        // tokenIdentifier: identity?.tokenIdentifier,
      });
    } else {
      console.log(
        { clerkUser: args.clerkUser, identity },
        "updateOrCreateUser-xxxxx-CLERK_USER",
      );

      // if (!args.clerkUser) throw new Error("Unauthorized!");

      return await ctx.db.insert("users", {
        // fullname: args.clerkUser.profile.fullName,
        fullname: `${args.clerkUser.first_name} ${args.clerkUser.last_name}`,
        username: args.clerkUser.username as string,
        email: args.clerkUser.email_addresses[0].email_address,
        avatar: args.clerkUser.image_url,
        bio: "",
        gender: args.clerkUser.unsafe_metadata.gender as "MALE" | "FEMALE",
        clerk_id: args.clerkUser.id,
        // tokenIdentifier: identity?.tokenIdentifier || "nai-identifier",
      });
    }
  },
});

export const getCurrentUser = query({
  args: {},
  async handler(ctx) {
    const user = await currentUserQuery(ctx);
    if (!user) return;

    return user;
  },
});

/** Delete a user by clerk user ID. */
// export const deleteUser = mutation({
//   args: {},
//   async handler(ctx) {
//     const user = await currentUserQuery(ctx);
//     if (!user) return;

//     console.log({ user }, "user from deleteUserMutation");

//     return await ctx.db.delete(user._id);
//   },
// });

/** Delete a user by clerk user ID. */
export const internalDeleteUser = internalMutation({
  args: { id: v.string() },
  async handler(ctx, args) {
    return await ctx.db.delete(args.id as Id<"users">);
  },
});

// utils
export async function userQueryByClerkId(
  ctx: QueryCtx,
  clerkUserId: string,
): Promise<Omit<Doc<"users">, "clerkUser"> | null> {
  return await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerk_id", clerkUserId))
    .unique();
}

export async function currentUserQuery(
  ctx: QueryCtx | MutationCtx,
): Promise<Omit<Doc<"users">, "clerkUser"> | null> {
  const identity = await ctx.auth.getUserIdentity();

  if (!identity) throw new Error("Unauthorized!");

  return await ctx.db
    .query("users")
    .filter((q) => q.eq("tokenIdentifier", identity.tokenIdentifier))
    .unique();
}

import { currentUser } from "@clerk/nextjs/server";
import { mutation } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    const cuser = await currentUser;
    console.log({ identity, cuser }, "customUserIdentity");

    if (!identity) throw new Error("Unauthorized!");

    // Check if the user is already stored in the database
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (user !== null) {
      // If the user is already in the database but the name change,
      // Patch the new name
      console.log(user.fullname !== identity.name, "store 22");
      if (user.fullname !== identity.name) {
        await ctx.db.patch(user._id, {
          fullname: identity.name,
        });
      }

      return user._id;
    }

    // If it's a new user, we create a new one
    return await ctx.db.insert("users", {
      fullname: identity.name!,
      avatar: identity.pictureUrl!,
      bio: "",
      username: identity.nickname!,
      email: identity.email!,
      gender: identity.gender === "male" ? "Male" : "Female",
      tokenIdentifier: identity.tokenIdentifier,
    });
  },
});

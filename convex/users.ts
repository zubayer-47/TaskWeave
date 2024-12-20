import { mutation } from "./_generated/server";
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();

    console.log({ identity }, "customUserIdentity");

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
      // if (user.fullname !== identity.name) {
      //   await ctx.db.patch(user._id, {
      //     name: identity.name,
      //     profileUrl: identity.pictureUrl,
      //   });
      // }

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

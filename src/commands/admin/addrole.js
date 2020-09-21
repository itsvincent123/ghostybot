const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "addrole",
  description: "Add a role to a user",
  category: "admin",
  async execute(bot, message, args) {
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send(errorEmbed("manage roles (Manage Roles)", message));

    if (!message.member.hasPermission("MANAGE_ROLES" || "ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");

    const needsRole =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.cache.get(args[0]);

    const role =
      message.guild.roles.cache.find(
        (role) => role.name === args.join(" ").slice(23)
      ) || message.mentions.roles.first() || message.guild.roles.cache.get(args.join(" ").slice(23));

    if (!needsRole) return message.channel.send("User wasn't found");
    if (!role) return message.channel.send("Please provide a valid role");
    if (needsRole.roles.cache.some((r) => role.id === r.id))
      return message.channel.send("User already has that role");

    needsRole.roles.add(role.id);

    message.channel.send(`Successfully Added **${role.name}** to ${needsRole}`);
  },
};

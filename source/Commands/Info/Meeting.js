const config = require("../../Configurations/Server_Settings");

module.exports = {
	config: {
		aliases: ["meeting"],
		name: "meeting",
        help: "meeting",
		enabled: true
	},

	run: async ({ client, message, args, embed, guild, author }) => {

        if (!message.member.permissions.has(config.Roles.Staff.botCommand)) return message.reply({ content: `Rolun yoxdu abi.` }).then(message.react(config.Others.Emojis.reject)).sil(10);

        message.channel.send(`<@970411727885848608> qurucumuz sizi toplantı **( <#${config.Channels.Meeting.Channel}> )** otağına çağırır!`)
}}

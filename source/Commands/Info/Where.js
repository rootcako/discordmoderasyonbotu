const config = require("../../Configurations/Server_Settings.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
    config: {
	aliases: ["where", "nerede"],
	name: "where",
	help: "where [@jahangear/ID]",
	enabled: true
	},

	run: async ({ client, message, args, embed, guild, author }) => {

        if (!message.member.permissions.has(config.Roles.Staff.botCommand)) return message.reply({ content: `Səlahiyyətli rolunu üzərində daşımırsan.` }).then(message.react(config.Others.Emojis.reject)).sil(10);

let member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!member) return message.reply({ content: `Keçərli bir üzv göstər!`}).then(message.react(config.Others.Emojis.reject)).sil(10);

let kanal = member.voice.channel
if(!kanal) return message.reply({ embeds: [embed.setDescription(`${member} üzvü heçbir kanalda tapılmadı.`)] }).then(message.react(config.Others.Emojis.reject)).sil(10);

let mic = member.voice.selfMute ? "bağlı" : "açık";
let kulak = member.voice.selfDeaf ? "bağlı" : "açıq";

kanal.createInvite().then(chewy =>
    message.reply({ embeds: [embed.setDescription(`${member} üzvü **${kanal.name}** kanalındadır.

Mikrofon Vəziyyəti: **${mic}**
Kulaklık Vəziyyəti: **${kulak}**`)] }));
}};
//import Discord
const Discord = require('discord.js')
//i dont want to comment anymore
module.exports.exec = (client, message, prefix) => {
    const embed = new Discord.MessageEmbed()
    .setTitle("Command list")
    .setURL("https://www.veed.io/view/31d2a871-058a-4056-9efc-b4a4e97ba01a")
    .setColor("#ff0000")
    .setDescription(`${prefix}help - this message\n${prefix}stats - COVID-19 statistics\n${prefix}game - mini-game`)
    .setThumbnail("https://intosairussia.org/images/covid19.jpeg")
    .setTimestamp()
    message.reply({ embeds: [embed] })
}
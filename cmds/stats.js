//import Discord & other modules
const Discord = require('discord.js')
const snek = require('snekfetch')
//i dont want to comment anymore
module.exports.exec = (client, message, prefix) => {
    var options = []
    snek.get("https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true").then(res => {
        res.body.forEach(val => {
            options.push({
                label: val.country,
                description: `Last updated: ${val.lastUpdatedApify}`,
                value: val.country
            })
        })
        setTimeout(() => {
            var rows = []; var size = 25; var arrayOfArrays = [];
            for (var i=0; i<options.length; i+=size) {
                arrayOfArrays.push(options.slice(i,i+size))
            }
            setTimeout(() => {
                arrayOfArrays.forEach(option => {
                    var temp_row = new Discord.MessageActionRow()
                    .addComponents(
                        new Discord.MessageSelectMenu()
                            .setCustomId('country_select' + arrayOfArrays.indexOf(option))
                            .setPlaceholder('Nothing selected')
                            .addOptions(option),
                    )
                    rows.push(temp_row)
                })
                setTimeout(() => {
                    message.reply({ content: "Select a country.", components: rows })
                }, 1000);
            }, 1000);
        }, 1000);
    })
}
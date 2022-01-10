//prefix
const prefix = "cov!"
//import fs to check for command's existance
const fs = require('fs')
//import discord.js
const Discord = require("discord.js")
//import intents (i think they are lame)
const { Intents } = require("discord.js")
//save time and get every intent
var intents = 0
//for each intent bit, add it to intents variable
Object.keys(Intents.FLAGS).forEach(i => {
    intents += Intents.FLAGS[i]
})
setTimeout(() => {
    var ParsedIntents = new Discord.Intents(intents)
    //create a client object
    const client = new Discord.Client({ intents: ParsedIntents })
    //handle message event
    client.on('messageCreate', (message) => {
        //check if message is related to the bot
        if (!message.content.startsWith(prefix)) return
        //handle commands
        const command = message.content.split(" ")[0].slice(prefix.length).toLowerCase()
        //check if command exists
        if (!fs.existsSync("./cmds/" + command + ".js")) return
        //execute the command code
        require("./cmds/" + command).exec(client, message, prefix)
    })
    //handle interactions
    client.on('interactionCreate', (interaction) => {
        //check if its a list type of interaction
        if(interaction.isSelectMenu()) {
            //check if its a stats command
            if(interaction.customId.includes("country_select")) {
                //get the stats of the country
                require('snekfetch').get("https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true").then(res => {
                    res.body.forEach(val => {
                        if(val.country === interaction.values[0]) {
                            const embed = new Discord.MessageEmbed()
                            .setTitle(`Statistics of ${val.country}`)
                            .setTimestamp()
                            .setFooter({ text: interaction.member.user.tag, iconURL: interaction.member.avatarURL() })
                            .addFields([
                                {
                                    name: "Infected",
                                    value: val.infected.toString()
                                },
                                {
                                    name: "Tested",
                                    value: val.tested.toString()
                                },
                                {
                                    name: "Recovered",
                                    value: val.recovered.toString()
                                },
                                {
                                    name: "Deceased",
                                    value: val.deceased.toString()
                                },
                                {
                                    name: "Source",
                                    value: val.sourceUrl.toString()
                                }
                            ])
                            .setColor("RED")
                            interaction.message.edit({ content: "Here ya go!", embeds: [embed], components: [] })
                        }
                    })
                })
            }
        }
    })
    //login into the bot
    client.login("your mom lol")
}, 1000);
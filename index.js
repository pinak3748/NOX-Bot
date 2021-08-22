require("dotenv").config();
const {
  Client,
  Intents,
  Discord,
  Message,
  RichEmbed,
  MessageEmbed,
} = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const fetch = require("node-fetch");
const { Octokit } = require("octokit");

const octokit = new Octokit({
  auth: process.env.GIT_TOKEN,
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

function RandomColorPicker() {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
}

function embedERROR() {
  let embed = new MessageEmbed();
  embed.setTitle("Something went wronge");
  embed.setColor("#ff0000");
  return embed;
}

client.on("message", (msg) => {
  if (msg.author.bot) return;
  //If Bot reply's don't read message
  else if (msg.content === "$NOX") {
    async function username() {
      //To get Master user
      const response = await octokit.request("GET /user");
      await msg.channel.send(response.data.login);
    }

    username().catch((res) => {
      //Call Function
      const embed = embedERROR();
      msg.reply({ embeds: [embed] });
    });
  }

  const roleName = msg.member.roles.cache.find((r) => r.name === "Master"); //Assign your custom role name how can use the syntex

  if (msg.content.includes("nox") && roleName != null) {
    //if it has master syntex

    if (msg.content.includes("-l") && msg.content.split(" ").length - 1 == 2) {
      // for if it has -l

      const content = msg.content.split(" ");

      const Listrepo = async () => {
        const res = await octokit.request("GET /users/{username}/repos", {
          username: content[2],
        });
        let str = "";
        for (let i = 0; i < res.data.length; i++) {
          str = str + res.data[i].name + "," + `\n`;
        }
        const embed = await new MessageEmbed();
        embed.setTitle("The repo's are:");
        embed.setColor(RandomColorPicker());
        // embed.setAuthor( client.user.username , client.user.displayAvatarURL() )
        embed.setDescription(str);

        return embed;
      };

      Listrepo()
        .then((embed) => {
          msg.reply({ embeds: [embed] });
        })
        .catch((res) => {
          if (res.status == 404) {
            const embed = embedERROR();
            embed.setDescription("User not found");
            msg.reply({ embeds: [embed] });
          } else {
            const embed = embedERROR();
            msg.reply({ embeds: [embed] });
          }
        });
    } 
    else if ( msg.content.includes("-b") && msg.content.split(" ").length - 1 == 3) {   // to get the branches of repo of any user

      const content = msg.content.split(" ");

     const DisplayBranches = async () => {

      const res = await octokit.request(
        "GET /repos/{owner}/{repo}/branches",
        {
          owner: content[2],
          repo: content[3],
        }
      );

      let str = "";
      for (let i = 0; i < res.data.length; i++) {
        str = str + res.data[i].name + "," + `\n`;
      }

      let embed = await new MessageEmbed();
      embed.setTitle("The branches are:");
      embed.setColor(RandomColorPicker());
      embed.setAuthor(client.user.username, client.user.displayAvatarURL());
      embed.setDescription(str);
      return embed;
     }

     DisplayBranches()
     .then((embed) => {
        msg.reply({ embeds: [embed] });
     })
     .catch((res) => {
      if (res.status == 404) {
        const embed = embedERROR();
        embed.setDescription("Repo not found");
        msg.reply({ embeds: [embed] });
      } else {
        const embed = embedERROR();
        msg.reply({ embeds: [embed] });
      }
    });
   }
    
    else if ( msg.content.includes("-p") && msg.content.split(" ").length - 1 == 2 ) {      // to display profile card of user

      const content = msg.content.split(" ");

      const ProfileCard = async () => {

        const res = await octokit.request("GET /users/{username}", {
          username: content[2],
        });

        const exampleEmbed = await new MessageEmbed();

        if (res.data.name != null) {
          exampleEmbed.setTitle(res.data.name);
        }
        exampleEmbed.setColor(RandomColorPicker());

        if (res.data.bio != null)
          exampleEmbed.setDescription(res.data.login + "\n" + res.data.bio);
        else {
          exampleEmbed.setDescription(res.data.login);
        }

        if (res.data.email != null) {
          exampleEmbed.addFields({
            name: "Email",
            value: res.data.email,
          });
        }
        exampleEmbed.setThumbnail(res.data.avatar_url);
        exampleEmbed.addFields({
          name: "Link to profile",
          value: res.data.html_url,
        });
        if (res.data.blog != "") {
          exampleEmbed.addFields({
            name: "Link to Project",
            value: res.data.blog,
          });
        }
        if (res.data.twitter_username != null) {
          exampleEmbed.addFields({
            name: "Twitter",
            value: res.data.twitter_username,
          });
        }
        exampleEmbed.addFields(
          {
            name: "Followers",
            value: res.data.followers.toString(),
            inline: true,
          },
          {
            name: "Following",
            value: res.data.following.toString(),
            inline: true,
          },
          {
            name: "Public repo",
            value: res.data.public_repos.toString(),
            inline: true,
          }
        );
        exampleEmbed.setTimestamp();

        return exampleEmbed;
      }

      ProfileCard()
      .then((embed) => {
        msg.reply({ embeds: [embed] });
      })
      .catch((res) => {
        if (res.status == 404) {
          const embed = embedERROR();
          embed.setDescription("User not found");
          msg.reply({ embeds: [embed] });
        } else {
          const embed = embedERROR();
          msg.reply({ embeds: [embed] });
        }
      });

  }
}
});

client.login(process.env.Discord_token);

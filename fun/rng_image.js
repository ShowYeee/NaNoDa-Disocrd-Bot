const fs = require("fs");
const path = require("path");

const { AttachmentBuilder } = require("discord.js");

/**
 * 檢查給定的文件名是否為圖片
 * @param {string} filename 文件名
 * @return {boolean} 是否為圖片
 */
function isImage(filename) {
  const validExtensions = [".jpg", ".jpeg", ".png", ".gif", ".bmp"];
  return validExtensions.includes(path.extname(filename).toLowerCase());
}

/**
 * 從指定目錄隨機選擇一個圖片文件
 * @param {string} directory 目錄路徑
 * @return {string|null} 圖片文件的路徑或 null（如果沒有找到圖片）
 */
function findRandomImage(directory) {
  try {
    const files = fs.readdirSync(directory);
    const imageFiles = files.filter((file) => isImage(file));

    if (imageFiles.length === 0) {
      return null;
    }

    const randomFile =
      imageFiles[Math.floor(Math.random() * imageFiles.length)];
    return path.join(directory, randomFile);
  } catch (error) {
    console.error("Error reading directory:", error);
    return null;
  }
}

/**
 * 從指定參數名稱隨機選擇一個圖片文件
 * @param {string} pathName 路徑名稱
 * @return {string|null} 圖片文件的路徑或 null（如果沒有找到圖片）
 */
function rngPath(pathName) {
  const directory = `./assets/image/${pathName}`;
  const filepath = findRandomImage(directory);
  return filepath;
}

/**
 * 從指定參數名稱隨機選擇一個圖片文件
 * @param interaction Discord 事件
 * @param {string} name 路徑名稱
 * @param {string} msg 機器人回傳訊息，如果是 null 則否
 */
async function rngImgMsg(interaction, name, msg = null) {
  const filePath = rngPath(name);
  const attachment = new AttachmentBuilder(filePath);
  await interaction.reply({ content: msg, files: [attachment] });
}

module.exports = {
  rngPath,
  rngImgMsg,
};

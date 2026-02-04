#!/bin/bash

# 註冊斜線指令（deploy-commands.js 會使用 logger 輸出格式化的日誌）
if ! node scripts/deploy-commands.js; then
  # 如果註冊失敗，使用簡單的錯誤訊息（因為 logger 可能無法使用）
  echo "警告: 斜線指令註冊失敗，但將繼續啟動機器人" >&2
fi

# 啟動機器人（src/index.js 會使用 logger 輸出格式化的日誌）
exec node src/index.js

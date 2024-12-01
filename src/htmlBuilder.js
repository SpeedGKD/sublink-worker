import { UNIFIED_RULES, PREDEFINED_RULE_SETS } from './config.js';
import { generateStyles } from './style.js';

export function generateHtml(xrayUrl, singboxUrl, clashUrl, baseUrl) {
return `
<!DOCTYPE html>
<html lang="en">
${generateHead()}
${generateBody(xrayUrl, singboxUrl, clashUrl, baseUrl)}
</html>
`;
}

const generateHead = () => `
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Sublink Worker是一款强大的在线订阅链接转换工具,支持V2Ray/Xray、SingBox、Clash等多种客户端，提供自定义规则和高效转换，帮助您轻松管理和优化代理节点。">
    <meta name="keywords" content="Sublink, Worker, 订阅链接, 代理, Xray, SingBox, Clash, V2Ray, 自定义规则, 在线, 订阅转换, 机场订阅, 节点管理, 节点解析">
    <title>Sublink Worker - 轻量高效的订阅转换工具 | 支持V2Ray/Xray、SingBox、Clash</title>
    <meta property="og:title" content="Sublink Worker - 轻量高效的订阅链接转换工具">
    <meta property="og:description" content="强大的在线订阅链接转换工具,支持多种代理协议和自定义规则">
    <meta property="og:type" content="website">
    <meta property="og:url" content="https://sublink-worker.sageer.me/">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.0/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js"></script>
    <style>
      ${generateStyles()}
    </style>
  </head>
`;



const generateBody = (xrayUrl, singboxUrl, clashUrl, baseUrl) => `
  <body>
    ${generateDarkModeToggle()}
    ${generateGithubLink()}
    <div class="container mt-5">
      <div class="card mb-5">
        ${generateCardHeader()}
        <div class="card-body">
          ${generateForm()}
          <div id="subscribeLinksContainer">
            ${generateSubscribeLinks(xrayUrl, singboxUrl, clashUrl, baseUrl)}
          </div>
        </div>
      </div>
    </div>
    ${generateScripts()}
    <!-- Cloudflare Web Analytics -->
    <script defer src='https://static.cloudflareinsights.com/beacon.min.js' data-cf-beacon='{"token": "67ed5892c109479cb0baddfaa9249c4e"}'></script>
    <!-- End Cloudflare Web Analytics -->
  </body>
`;

const generateDarkModeToggle = () => `
<button id="darkModeToggle" class="btn btn-outline-secondary">
<i class="fas fa-moon"></i>
</button>
`;

const generateGithubLink = () => `
<a href="https://github.com/yixiu001/sublink-worker" target="_blank" rel="noopener noreferrer" class="github-link">
<i class="fab fa-github"></i>
</a>
`;

const generateCardHeader = () => `
  <div class="card-header text-center">
    <h1 class="display-4 mb-0">Sublink Worker 汉化版</h1>
  </div>
`;

const generateForm = () => `
  <form method="POST" id="encodeForm">
    <div class="form-section">
      <div class="form-section-title">订阅链接</div>
      <textarea class="form-control" id="inputTextarea" name="input" required placeholder="vmess://abcd..." rows="3"></textarea>
    </div>

    <div class="form-check form-switch mb-3">
      <input class="form-check-input" type="checkbox" id="advancedToggle">
      <label class="form-check-label" for="advancedToggle">高级选项</label>
    </div>

    <div id="advancedOptions">
      <div class="form-section">
        ${generateRuleSetSelection()}
      </div>

      <div class="form-section">
        <div class="form-section-title d-flex align-items-center">
          基本配置设置（可选）
          <span class="tooltip-icon ms-2">
            <i class="fas fa-question-circle"></i>
            <span class="tooltip-content">
              此功能是实验性的，可能无法按预期工作。您可以在此处粘贴自己的基本配置。转到 <a href="https://github.com/yixiu001/sublink-worker/blob/main/docs/base-config.md" target="_blank">文档</a> 了解更多信息。
            </span>
          </span>
        </div>
        <div class="mb-3">
          <select class="form-select" id="configType">
            <option value="singbox">SingBox (JSON)</option>
            <option value="clash">Clash (YAML)</option>
          </select>
        </div>
        <div class="mb-3">
          <textarea class="form-control" id="configEditor" rows="3" placeholder="将您的自定义配置粘贴到此处..."></textarea>
        </div>
        <div class="d-flex gap-2">
          <button type="button" class="btn btn-secondary" onclick="saveConfig()">保存配置</button>
          <button type="button" class="btn btn-outline-danger" onclick="clearConfig()">
            <i class="fas fa-trash-alt me-2"></i>清除配置
          </button>
        </div>
      </div>
    </div>

    <div class="d-flex gap-2 mt-4">
      <button type="submit" class="btn btn-primary flex-grow-1">
        <i class="fas fa-sync-alt me-2"></i>转换
      </button>
      <button type="button" class="btn btn-outline-secondary" id="clearFormBtn">
        <i class="fas fa-trash-alt me-2"></i>清除
      </button>
    </div>
  </form>
`;

const generateSubscribeLinks = (xrayUrl, singboxUrl, clashUrl, baseUrl) => `
  <div class="mt-5">
    <h2 class="mb-4">您的订阅链接:</h2>
    ${generateLinkInput('v2ray 订阅:', 'xrayLink', xrayUrl)}
    ${generat

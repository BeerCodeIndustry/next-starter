#!/usr/bin/env node

const { execSync } = require('child_process')

const runCmd = cmd => {
  try {
    execSync(`${cmd}`, { stdio: 'inherit' })
  } catch (e) {
    console.error(`Failed to execute ${cmd}`, e)

    return false
  }

  return true
}

const repoName = process.argv[2] ?? 'next-app'
const gitCheckoutCmd = `git clone --depth 1 https://github.com/BeerCodeIndustry/next-starter ${repoName}`
const installDepsCmd = `cd ${repoName} && yarn install`

console.log(`Cloning the repository with name ${repoName}`)
const checkoutOut = runCmd(gitCheckoutCmd)
if (!checkoutOut) process.exit(-1)

console.log(`Installing dependencies for ${repoName}`)
const installedDeps = runCmd(installDepsCmd)
if (!installedDeps) process.exit(-1)

console.log(
  'Congratulations! You are ready. Follow the following commands to start',
)
console.log(`cd ${repoName} && yarn start`)

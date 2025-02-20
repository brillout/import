import fs from 'fs/promises'
const distCjs = 'dist/cjs'

main()

async function main() {
  await generatePackageJson()
}

async function generatePackageJson() {
  await fs.writeFile(distCjs + '/package.json', '{ "type": "commonjs" }\n', 'utf8')
  console.log(`✅ ${distCjs}/package.json generated`)
}

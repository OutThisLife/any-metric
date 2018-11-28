const { spawn } = require('child_process')

const cmd = 'ts-node -P tsconfig.server.json ./bin/apollo.ts'

try {
  console.log(cmd.split(' ').slice(1))
  const app = spawn('ts-node', cmd.split(' ').slice(1), {
    stdio: 'inherit',
    shell: true
  })

  app.on('data', () => {
    console.log('Server started')

    const build = spawn('yarn', ['export:app'], {
      stdio: 'inherit',
      shell: true
    })

    build.on('close', () => app.kill())
  })
} catch (err) {
  console.trace(err)
  process.exit(1)
}

import dotenv from 'dotenv';
import { spawn } from 'child_process';

dotenv.config();

const server = spawn('./node_modules/@remix-run/serve/dist/cli.js', ['./build/server/index.js'], {
  stdio: 'inherit',
  cwd: process.cwd(),
});

server.on('exit', (code) => process.exit(code));

server.on('error', (error) => console.error(error));

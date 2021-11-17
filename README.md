# vite-plugin-zip
A Vite plugin to zip up files

## Install (yarn or npm)

**node version:** >=12.0.0

**vite version:** >=2.0.0

```bash
yarn add vite-plugin-zip -D
```

or

```bash
npm i vite-plugin-zip -D
```



## Options
| Parameter  | Types                 | Default | Description  
| ---------- | --------------------- | ------- | ------------
|dir         | String                |dist| directory to zip up
|name        | Stirng                |`${new Date().getMonth() + 1}${new Date().getDate()}`| name of output file



## Usage
```
// vite-up-config
import { defineConfig } from 'vite'
import zip from '../dist/index.mjs'

export default defineConfig({
  plugins: [
    zip({
      dir: 'dist',
      outputName: 'liufeifeiholy'
    })
  ]
})
```

## Example
```
yarn
yarn build
cd ./example
yarn build
```



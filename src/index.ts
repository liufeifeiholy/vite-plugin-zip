import { Plugin, ResolvedConfig } from 'vite'
import { VitePluginZip } from './types'
import * as path from 'path'
import * as fs from 'fs'
import { ZipFile } from 'yazl'

const zip = (options: VitePluginZip = { }): Plugin => {

  let {
    dir,
    outputName
  } = options

  let outputPath: string
  let config: ResolvedConfig

  return {
    name: 'vite:zip',
    apply: 'build',
    enforce: 'post',
    configResolved(resolvedConfig) {
      console.log('---', resolvedConfig)
      config = resolvedConfig
      outputPath = path.isAbsolute(config.build.outDir)
        ? config.build.outDir
        : path.join(config.root, config.build.outDir)
    },

    closeBundle() {
      let arr: string[] = [] 
      dir = dir || outputPath
      outputName = outputName || `${new Date().getMonth() + 1}${new Date().getDate()}`

      getFileList(dir, arr)
      generateZip(arr, dir, outputName)
    }
  }
}

const getFileList = function(dir:string, arr: string[]) {
  if (!dir) return

  try {
    const stat = fs.statSync(dir)
    if (stat.isFile()) {
      arr.push(dir)
      return
    } else if (stat.isDirectory()) {
      const files = fs.readdirSync(dir)
      while (files.length) {
        const file = files.pop()
        const filePath = `${dir}/${file}`
        if (filePath.indexOf('.zip') > -1) { // delete existing .zip file
          fs.rmSync(filePath)
          continue
        }
        getFileList(filePath, arr)
      }
    }
  } catch(e) {
    console.log(e)
  } 
}

const generateZip = (arr: string[], dir: string, outputName: string) => {
  const zipfile = new ZipFile()
  const outFile = path.resolve(process.cwd(), `${dir}/${outputName}.zip`)
  arr.forEach(file => {
    zipfile.addFile(file, file.replace(dir, outputName))
  })
  zipfile.outputStream.pipe(fs.createWriteStream(outFile)).on("close", function() {
    console.log("done");
  });
  zipfile.end();
}

export default zip

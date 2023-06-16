import path from 'path'
import loadJsonFile from 'load-json-file'

export default async (req, res) => {
  const dirRelativeToPublicFolder = 'json'
  const dir = path.resolve('./public', dirRelativeToPublicFolder);
  let data = await loadJsonFile(dir+'/menu.json');
  res.statusCode = 200
  res.json(data);
}
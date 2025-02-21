const { shell, dialog } = require('electron')
const currentVersion = require('../package.json').version

const fetchLatestGHReleasefetch = async () => {
  const url =
    'https://api.github.com/repos/G-Ray/pikatorrent/releases?per_page=1'

  const res = await fetch(url)
  const json = await res.json()
  const release = json[0]
  return release
}

const isNewReleaseAvailable = async () => {
  const release = await fetchLatestGHReleasefetch()
  if (!release) {
    return false
  }

  const name = release.name.substring(1) // Do not consider 'v' prefix

  if (name <= currentVersion) {
    // No new release
    return false
  }

  // NOTE: In future, we will not release only as zip
  const expectedAsset = `pikatorrent-${process.platform}-${process.arch}-${name}.zip`
  const isAssetFound = release.assets.find(
    (asset) => asset.name === expectedAsset
  )

  return isAssetFound ? true : false
}

const displayNewReleaseDialog = () => {
  const clickedButtonIndex = dialog.showMessageBox({
    message: 'A new PikaTorrent release is available.',
    buttons: ['Cancel', 'Open downloads page'],
  })

  if (clickedButtonIndex === 1) {
    shell.openExternal('https://github.com/G-Ray/pikatorrent/releases')
  }
}

const checkNewRelease = async () => {
  try {
    if (await isNewReleaseAvailable()) {
      displayNewReleaseDialog()
    }
  } catch (e) {
    console.error(e)
  }
}

checkNewRelease()

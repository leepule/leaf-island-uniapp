import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const packagePaths = [
  path.join(projectRoot, 'package.json'),
  path.join(projectRoot, 'src/uni_modules/animal-island/package.json'),
];
const semverPattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-([0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*))?(?:\+[0-9A-Za-z-]+(?:\.[0-9A-Za-z-]+)*)?$/;

function readPackage(packagePath) {
  return JSON.parse(fs.readFileSync(packagePath, 'utf8'));
}

function assertVersion(version) {
  if (!semverPattern.test(version)) {
    throw new Error(`版本号“${version}”不符合 SemVer，例如 0.3.0 或 1.0.0-beta.1`);
  }
}

function nextVersion(currentVersion, releaseType) {
  const match = currentVersion.match(semverPattern);
  if (!match) {
    throw new Error(`当前版本号“${currentVersion}”不符合 SemVer`);
  }

  let major = Number(match[1]);
  let minor = Number(match[2]);
  let patch = Number(match[3]);

  if (releaseType === 'major') {
    major += 1;
    minor = 0;
    patch = 0;
  } else if (releaseType === 'minor') {
    minor += 1;
    patch = 0;
  } else if (releaseType === 'patch') {
    patch += 1;
  } else {
    assertVersion(releaseType);
    return releaseType;
  }

  return `${major}.${minor}.${patch}`;
}

function checkVersions(tagName) {
  const packages = packagePaths.map((packagePath) => ({
    packagePath,
    packageJson: readPackage(packagePath),
  }));
  const expectedVersion = packages[0].packageJson.version;

  assertVersion(expectedVersion);

  for (const { packagePath, packageJson } of packages.slice(1)) {
    if (packageJson.version !== expectedVersion) {
      throw new Error(
        `${path.relative(projectRoot, packagePath)} 的版本是 ${packageJson.version}，应与根 package.json 的 ${expectedVersion} 一致`,
      );
    }
  }

  if (tagName && tagName !== `v${expectedVersion}`) {
    throw new Error(`Git 标签“${tagName}”与项目版本不一致，应为 v${expectedVersion}`);
  }

  console.log(`版本检查通过：${expectedVersion}`);
}

function updateVersions(releaseType) {
  const rootPackage = readPackage(packagePaths[0]);
  const version = nextVersion(rootPackage.version, releaseType);

  for (const packagePath of packagePaths) {
    const packageJson = readPackage(packagePath);
    packageJson.version = version;
    fs.writeFileSync(packagePath, `${JSON.stringify(packageJson, null, 2)}\n`);
  }

  console.log(`版本已从 ${rootPackage.version} 更新为 ${version}`);
  console.log(`下一步：提交改动后创建并推送标签 v${version}`);
}

const command = process.argv[2];

if (command === 'check') {
  checkVersions(process.argv[3] || process.env.GITHUB_REF_NAME);
} else if (command) {
  updateVersions(command);
} else {
  throw new Error('请指定 patch、minor、major 或完整版本号，例如：yarn release:set 1.0.0-beta.1');
}

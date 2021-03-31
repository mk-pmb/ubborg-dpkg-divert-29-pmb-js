// -*- coding: utf-8, tab-width: 2 -*-

import isStr from 'is-string';
import mustBe from 'typechecks-pmb/must-be';
import objPop from 'objpop';

import fxSed from './fxSed';


function normalizeSpec(spec) {
  mustBe('str | obj', 'spec')(spec);
  if (isStr(spec)) { return { path: spec }; }
  return spec;
}


const defaultDistSuffix = '.distrib';


async function divert(bun, spec, then) {
  const mustSpec = objPop(normalizeSpec(spec), { mustBe }).mustBe;
  const path = (mustSpec('str | undef', 'pathPre', '')
    + mustSpec('str | undef', 'path', '')
    + mustSpec('str | undef', 'pathSuf', ''));

  const enable = mustSpec('bool', 'enable', true);

  let distFile = mustSpec('nonEmpty str', 'distFile', defaultDistSuffix);
  if (!distFile.startsWith('/')) { distFile = path + distFile; }

  const rename = mustSpec('bool', 'rename', true);
  const argv = [
    'dpkg-divert',
    '--local',
    '--divert',
    distFile,
    `--${rename ? '' : 'no-'}rename`,
    (enable ? '--add' : '--remove'),
    path,
  ];
  const command = { argv };
  command[enable ? 'creates' : 'removes'] = distFile;
  const tasks = [{ name: 'divert', command }];

  const normSpec = {
    path,
    enable,
    rename,
    distFile,
  };
  fxSed(normSpec, mustSpec, tasks);

  mustSpec.done();

  await bun.needs('ansibleTask', { url: 'dpkgDivert:' + path, tasks });

  if (!then) { return true; }
  return then.call(bun, normSpec, bun);
}


export default divert;

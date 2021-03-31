// -*- coding: utf-8, tab-width: 2 -*-

function fxSed(normSpec, mustSpec, tasks) {
  let sed = mustSpec('str | ary | undef', 'sed');
  const flags = mustSpec('str | undef', 'sedFlags', 'r');
  if (!normSpec.enable) { return; }
  const { distFile, path } = normSpec;
  if (sed && sed.join) { sed = sed.join('\n'); }
  if (!sed) { return; }
  tasks.push({
    name: 'sed:' + path,
    shell: ('sed -' + flags + 'f - -- "$ORIG" >"$DEST".sed.tmp'
      + ' && mv --no-target-directory -- "$DEST".sed.tmp "$DEST"'),
    args: { creates: path, stdin: sed.trim() + '\n' },
    environment: { ORIG: distFile, DEST: path },
  });
}


export default fxSed;

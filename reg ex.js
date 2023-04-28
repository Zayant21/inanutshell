const man_nutshell = /^\::man ns;$/;
const nutshell = /\::ns\s+([^;-]+)\s*;/;
const nutshell_s = /\::ns\s+-s\s+([^;]+)\s*;/;
const nutshell_lc = /^\::ns\s+-lc\s+([^;]+);\s*$/ ;
const nutshell_sum = /^\::ns\s+-sum;\s*$/;
const nutshell_version = /^\::ns\s+-v;\s*$/;
import * as ts from 'typescript';

const userAppFile = './user-app.ts';
const apiFile = './api.d.ts';

const program = ts.createProgram([userAppFile, apiFile], ts.getDefaultCompilerOptions());
const checker = program.getTypeChecker();
const sourceFile = program.getSourceFile(userAppFile);

function printApi(node) {
    // get symbol
    const symbol = checker.getSymbolAtLocation(node);

    if (symbol) {
        const declarations = symbol.getDeclarations();
        const fileName = declarations[0].getSourceFile().fileName;

        console.log(`${symbol.name} is from ${fileName}`);
    }

    // visit its children
    ts.forEachChild(node, printApi);
}

printApi(sourceFile);

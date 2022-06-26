const path = require('path');

const extraNodeModules = {
    'PortalEducacaoBack': path.resolve(__dirname + './../PortalEducacaoBack'),
};

const watchFolders = [
    path.resolve(__dirname + './../PortalEducacaoBack'),
];

module.exports = {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
    }, 
    resolver: {
      extraNodeModules
    },
    watchFolders,
};
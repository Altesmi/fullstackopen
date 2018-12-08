module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest/globals": true
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jest"
    ],
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:jest/recommended"
    ],
    "rules": {
        "indent": [
            "error",
            2,
            {"SwitchCase": 1}
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "never"
        ],
        "jest/no-disabled-tests": "warn",
        "jest/no-focused-tests": "error",
        "jest/no-identical-title": "error",
        "jest/prefer-to-have-length": "warn",
        "jest/valid-expect": "error",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error",
        "no-console": 0,
        "react/prop-types": 0,
        "eqeqeq": "error",
        "no-trailing-spaces": "error",
        "object-curly-spacing": [
            "error", "always"
        ],
        "arrow-spacing": [
            "error", { "before": true, "after": true }
        ],
    },

    // "settings": {
    //     "react": {
    //       "createClass": "createReactClass", // Regex for Component Factory to use,
    //                                          // default to "createReactClass"
    //       "pragma": "React",  // Pragma to use, default to "React"
    //       "version": "15.0", // React version, default to the latest React stable release
    //       "flowVersion": "0.53" // Flow version
    //     },
    //     "propWrapperFunctions": [
    //         // The names of any function used to wrap propTypes, e.g. `forbidExtraProps`. If this isn't set, any propTypes wrapped in a function will be skipped.
    //         "forbidExtraProps",
    //         {"property": "freeze", "object": "Object"},
    //         {"property": "myFavoriteWrapper"}
    //     ]
    //   }
};
import { spinner, execCommandOnProject, log } from "../../utils.js";
const tailwindConfigString = `module.exports = {
    prefix: '',
    content: [
      'src/**/*.{html,ts,tsx,js,jsx}'
    ],
    darkMode: 'class', // 'media' or 'class'
    theme: {
      extend: {
        outline: {
          tselBlue: '#0050AE',
          tselRed: '#FF0025'
        },
        height: {
          fc: 'fit-content'
        },
        maxHeight: {
          320: '320px',
          fc: 'fit-content'
        },
        minHeight: {
          fc: 'fit-content'
        },
        zIndex: {
          '-10': '-10'
        },
        transitionProperty: {
          height: 'height',
          spacing: 'margin, padding'
        },
        borderRadius: {
          20: '20px'
        },
        lineHeight: {
          12: '3rem'
        }
      },
      colors: {
        primary: {
          darkBlue: '#001A41',
          tselRed: '#FF0025',
          tselBlack: '#000000',
          tselWhite: '#ffffff',
          tselGrey10: '#FAFAFB',
          tselGrey20: '#EDECF0',
          tselGrey40: '#CCCFD3',
          tselGrey50: '#79838D',
          tselGrey60: '#99A0A7',
          tselGrey80: '#66707A',
          tselGrey90: '#5F6368',
          tselGrey100: '#4E5764'
        },
        secondary: {
          tselRed: '#ED0226',
          tselDarkRed: '#B90024',
          tselErrorRed: '#BC1D42',
          tselLightDarkRed: '#F2E2E2',
          tselLightRed: '#FCF4F4',
          tselSemanticRead: '#FEEFEB',
          tselMustard: '#FDA22B',
          tselLightMustard: '#FFEED8',
          tselBlue: '#0050AE',
          tselOtherLightBlue: '#1A73E8',
          tselLightBlue: '#EDF5FC',
          tselSoftBlue: '#CDD6E7',
          tselOtherSoftBlue: '#E9F6FF',
          tselDarkBlue100: '#F9F9FA',
          tselGreen: '#008E53',
          tselCard: '#F6F3F3',
          tselDivider: '#C4C4C4',
          tselGoldenYellow100: '#F6AB2F',
          tselShadesBlue: '#344960',
          tselShades600: '#334867',
          tselPink: '#FCF4F4',
          tselShadeInkBlade: '#001122',
          tselShadeGray50: '#79838D',
          tselTagBackgound: '#E9E4E4',
          tselSunsetOrange: '#FE6E00',
          tselSecondaryGreyBg: '#F5F6FA',
          tselSpearminGreen: '#EEF9F4',
          tselForestGreen100: '#1D9940',
          tselWarningOrange: '#D44000',
          tselSemanticBlue: '#E9F6FF',
          tselCultured: '#F7F7F7',
          tselCoolGrey: '#8C99AC',
          tselLightGrey: '#CCD1D9',
          tselAliceBlue: '#E9F6FF',
          tselVenetianRed: '#BC1D42',
          tselCadetBlue: '#B3BAC6',
          tselPapayaWhip: '#FEF3D4',
          tselTopaz: '#FED27F',
          tselWarningYellow: '#D9801F',
          tselTealDeer: '#9AEEAB',
          tselHoneyDew: '#EDFCF0',
          tselCornFlower: '#CF2E01',
          tselBrightGray: '#EBEEEF',
          tselShadowGray: '#7A7A7A',
          disabled: '#f1f1f4',
          disabled02: '#E9E8ED'
        },
        shade: {
          grey: {
            100: '#353941'
          }
        }
      },
      fontSize: {
        'f-8': '8px',
        'f-10': '10px',
        'f-11': '11px',
        'f-12': '12px',
        'f-13': '13px',
        'f-14': '14px',
        'f-15': '15px',
        'f-16': '16px',
        'f-17': '17px',
        'f-18': '18px',
        'f-19': '19px',
        'f-20': '20px',
        'f-24': '24px',
        'f-28': '28px',
        'f-32': '32px',
        'f-40': '40px',
        'f-56': '56px',
        'f-72': '72px'
      },
      boxShadow: {
        hover: '-16px -16px #ff0025'
      },
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1366px'
      }
    },
    variants: {
      extend: {
        borderWidth: ['first']
      }
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')]
  };
  `;
const tailwindClassCss = `
@tailwind base;
@tailwind components;
@tailwind utilities;
`;
const tailwindInstallCommands = {
    pnpm: "pnpm add -g tailwindcss && pnpm add -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography",
    npm: "npm install -g tailwindcss && npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography",
    yarn: "yarn add -g tailwindcss && yarn add -D tailwindcss postcss autoprefixer @tailwindcss/forms @tailwindcss/typography",
};
export const createTailwindConfig = async (answers) => {
    const loadingSpinner = spinner("Creating tailwind configuration...\n").start();
    await execCommandOnProject(answers)(`${tailwindInstallCommands[answers.packageManager]} && npx tailwindcss init -p`);
    await execCommandOnProject(answers)(`echo "${tailwindConfigString}" > tailwind.config.js`);
    if (answers.projectFramework === "next.js") {
        await execCommandOnProject(answers)(`echo "${tailwindClassCss}" > ./src/styles/globals.scss`);
    }
    else if (answers.projectFramework === "@angular") {
        await execCommandOnProject(answers)(`echo "${tailwindClassCss}" > ./src/styles.scss`);
    }
    loadingSpinner.stop();
    log("✔ Tailwind configuration created successfully!");
};
//# sourceMappingURL=tailwind-config.js.map
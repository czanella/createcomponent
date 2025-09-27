import { input, select } from '@inquirer/prompts';
import { COMPONENT_NAME, COMPONENT_NAME_ERROR } from './args-schema';

export type AppOptions = {
  outputFolder: string;
  language: 'js' | 'ts';
  layoutSystem: null | 'css' | 'sass';
  layoutModule: boolean;
  storybook: string;
}

type QuestionaireProps = {
  defaults?: AppOptions;
  forceDefaults?: boolean;
  name?: string;
};

export async function questionaire({
  defaults = {
    outputFolder: '.',
    language: 'ts',
    layoutSystem: 'css',
    layoutModule: true,
    storybook: '',
  },
  forceDefaults = false,
  name,
}: QuestionaireProps = {}) {
  const componentName = name || await input({
    message: 'Name of the component',
    required: true,
    validate: name => Boolean(name.match(COMPONENT_NAME))
      ? true
      : COMPONENT_NAME_ERROR,
  });

  if (forceDefaults) {
    return [componentName, { ...defaults }] as const;
  }

  const outputFolder: AppOptions['outputFolder'] = await input({
    message: 'Path to where the component will be generated',
    required: true,
    validate: f => f.trim().length > 0,
    default: defaults.outputFolder,
  });

  const language: AppOptions['language'] = await select({
    message: 'Which language do you use?',
    choices: [
      {
        name: 'JavaScript',
        value: 'js',
      },
      {
        name: 'TypeScript',
        value: 'ts',
      },
    ],
    default: defaults.language,
  });

  const layoutSystem: AppOptions['layoutSystem'] = await select({
    message: 'Which layout system do you use?',
    choices: [
      {
        name: 'None/Tailwind',
        value: null,
      },
      {
        name: 'CSS',
        value: 'css',
      },
      {
        name: 'SASS',
        value: 'sass',
      },
    ],
    default: defaults.layoutSystem,
  });

  const layoutModule: AppOptions['layoutModule'] = !layoutSystem ? false : await select({
    message: `Use layout modules (.module.${layoutSystem})?`,
    choices: [
      {
        name: 'Yes',
        value: true,
      },
      {
        name: 'No',
        value: false,
      },
    ],
  });

  const useStorybook = await select({
    message: 'Create Storybook story?',
    choices: [
      {
        name: 'Yes',
        value: true,
      },
      {
        name: 'No',
        value: false,
      },
    ],
    default: Boolean(defaults.storybook),
  });

  const storybook: AppOptions['storybook'] = !useStorybook
    ? ''
    : await input({
    message: 'Name of the Storybook story',
    required: true,
    default: defaults.storybook,
  });

  return [componentName, {
    outputFolder,
    language,
    layoutSystem,
    layoutModule,
    storybook,
  }] as const;
};

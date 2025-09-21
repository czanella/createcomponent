import { input, select } from '@inquirer/prompts';

export type AppOptions = {
  componentName: string;
  outputFolder: string;
  language: 'js' | 'ts';
  layoutSystem: null | 'css' | 'module.css' | 'sass' | 'module.sass';
  storybook: string;
}

type QuestionaireProps = {
  defaults?: Partial<Omit<AppOptions, 'componentName'>>;
};

export async function questionaire({ defaults = {} }: QuestionaireProps = {}): Promise<AppOptions> {
  const componentName: AppOptions['componentName'] = await input({
    message: 'Name of the component',
    required: true,
    validate: name => Boolean(name.match(/^\s*[A-Z][a-zA-Z0-9]*\s*$/))
      ? true
      : 'Component name must start with an uppercase letter and have letters and numbers only',
  });

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
        name: 'CSS modules',
        value: 'module.css',
      },
      {
        name: 'SASS',
        value: 'sass',
      },
      {
        name: 'SASS modules',
        value: 'module.sass',
      },
    ],
    default: defaults.layoutSystem,
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

  return {
    componentName,
    outputFolder,
    language,
    layoutSystem,
    storybook,
  };
};

{% if layoutSystem %}import {% if layoutModule %}styles from {% endif %}'./{{ componentDashed }}.{% if layoutModule %}module.{% endif %}{{ layoutSystem }}';{% endif %}

type {{ componentName }}Props = {
};

export function {{ componentName }}({}: {{ componentName }}Props) {
  return (
    <div{% if layoutModule %} className={styles.{{componentLowercase}}}{% endif %}>
      {{ componentName }} component
    </div>
  );
}

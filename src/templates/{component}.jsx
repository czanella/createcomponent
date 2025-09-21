{% if layoutSystem %}import {% if layoutModule %}styles from {% endif %}'./{{ componentDashed }}.{% if layoutModule %}module.{% endif %}{{ layoutSystem }}';{% endif %}

export function {{ componentName }}({}) {
  return (
    <div{% if layoutModule %} className={styles.{{componentLowercase}}}{% endif %}>
      {{ componentName }} component
    </div>
  );
}

{% if layoutSystem %}import {% if layoutModule %}styles from {% endif %}'./{{ componentDashed }}.{% if layoutModule %}module.{% endif %}{{ layoutSystem }}';{% endif %}

export function {{ componentName }}({}) {
  return (
    <div className={% if layoutModule %}{styles.{{componentLowercase}}}{%else%}'{{componentLowercase}}'{% endif %}>
      {{ componentName }} component
    </div>
  );
}

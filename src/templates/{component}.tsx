{% if layoutSystem %}import {% if layoutModule %}styles from {% endif %}'./{{ componentDashed }}.{% if layoutModule %}module.{% endif %}{{ layoutSystem }}';{% endif %}

type {{ componentName }}Props = {
};

export function {{ componentName }}({}: {{ componentName }}Props) {
  return (
    <div className={% if layoutModule %}{styles.{{componentLowercase}}}{%else%}'{{componentLowercase}}'{% endif %}>
      {{ componentName }} component
    </div>
  );
}

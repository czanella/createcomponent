{% if layoutSystem %}import {% if layoutModule %}styles from {% endif %}'./{{ componentDashed }}.{% if layoutModule %}module.{% endif %}{{ layoutSystem }}';

{% endif %}type {{ componentName }}Props = {
  title: string;
};

export function {{ componentName }}({ title }: {{ componentName }}Props) {
  return (
    <div{% if layoutSystem %} className={% if layoutModule %}{styles.{{componentLowercase}}}{%else%}'{{componentLowercase}}'{% endif %}{% endif %}>
      {{ componentName }} component
      <p>Title parameter: {title}</p>
    </div>
  );
}

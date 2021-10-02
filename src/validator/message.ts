import lang from '../lang'

export default (type: string, label: string) => {
  const rule = type.split('.')[1]

  return lang.__(`validation.${rule}`, { attribute: label })
}

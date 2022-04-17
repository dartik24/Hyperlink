export function parseSkills(skillsString) {
    return skillsString
        .replaceAll(',', ' ')
        .split(' ')
        .filter(skill => skill);
}
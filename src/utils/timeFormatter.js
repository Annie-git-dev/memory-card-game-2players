function getTimeFragment(value, unit, locale = 'en-US') {
    return new Intl.NumberFormat(locale, { style: 'unit', unit, unitDisplay: 'long', }).format(value);
}

export default function formatDuration(seconds, locale = 'en-US') {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    const parts = [];
    if (mins > 0) parts.push(getTimeFragment(mins, 'minute', locale));
    parts.push(getTimeFragment(secs, 'second', locale));

    return parts.join(' ');
}
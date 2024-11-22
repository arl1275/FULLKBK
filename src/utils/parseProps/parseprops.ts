export function getFormattedDate(): string {
    const date = new Date();

    const day = date.getDate().toString().padStart(2, '0'); // Día con dos dígitos
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Mes con dos dígitos (getMonth() es 0-based)
    const year = date.getFullYear().toString().slice(-2); // Últimos dos dígitos del año

    const hours = date.getHours().toString().padStart(2, '0'); // Hora con dos dígitos
    const minutes = date.getMinutes().toString().padStart(2, '0'); // Minutos con dos dígitos
    const seconds = date.getSeconds().toString().padStart(2, '0'); // Segundos con dos dígitos

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

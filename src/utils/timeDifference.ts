function convertMillisecondsToHoursAndMinutes(milliseconds: number) {
  // Toplam dakika
  const totalMinutes = Math.floor(milliseconds / (1000 * 60));

  // Saat ve dakika hesapla
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  return { hours, minutes };
}

export const timeDifference = (flight: any) => {
  // Departure ve arrival zamanlarını oluştur
  const departureDateTime = new Date(
    `${flight.departureDate}T${flight.departureTime}Z`
  );
  const arrivalDateTime = new Date(
    `${flight.arrivalDate}T${flight.arrivalTime}Z`
  );

  let timeDifference = arrivalDateTime.getTime() - departureDateTime.getTime();

  if (arrivalDateTime < departureDateTime) {
    const oneDayMilliseconds = 24 * 60 * 60 * 1000;
    timeDifference += oneDayMilliseconds;
  }

  const { hours, minutes } =
    convertMillisecondsToHoursAndMinutes(timeDifference);
  const timeDiffText = `${hours}h ${minutes}m`;
  return { timeDiffText, hours, minutes };
};

function saatleriKarsilastir(saat1: string, saat2: string) {
  const [saat1Saat, saat1Dakika] = saat1.split(":").map(Number);
  const [saat2Saat, saat2Dakika] = saat2.split(":").map(Number);

  if (
    saat1Saat < saat2Saat ||
    (saat1Saat === saat2Saat && saat1Dakika < saat2Dakika)
  ) {
    return true;
  } else if (
    saat1Saat > saat2Saat ||
    (saat1Saat === saat2Saat && saat1Dakika > saat2Dakika)
  ) {
    return false;
  }
}
const findRoundTrips = (flights: any) => {
  const roundTrips = [];

  for (let i = 0; i < flights.length; i++) {
    for (let j = 0; j < flights.length; j++) {
      if (
        flights[i].arrivalAirportCode === flights[j].departureAirportCode &&
        flights[i].departureAirportCode === flights[j].arrivalAirportCode &&
        new Date(flights[i].arrivalDate) <=
          new Date(flights[j].departureDate) &&
        saatleriKarsilastir(flights[i].arrivalTime, flights[j].departureTime)
      ) {
        roundTrips.push([flights[i], flights[j]]);
      }
    }
  }

  return roundTrips;
};

export default findRoundTrips;

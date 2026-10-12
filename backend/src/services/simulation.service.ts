import { TransactionType } from "@prisma/client";

import { createTransaction } from "./transaction.service";
import { getIO } from "../socket";

const SAFE_MERCHANTS = [
  "Amazon",
  "Flipkart",
  "Swiggy",
  "Uber",
  "Netflix",
  "BookMyShow",
  "Blinkit",
];

const FRAUD_MERCHANTS = [
  "CryptoWorld",
  "DarkMarket",
  "OffshoreX",
];

const SAFE_CITIES = [
  "Mumbai",
  "Delhi",
  "Pune",
  "Bangalore",
  "Hyderabad",
];

const FRAUD_CITIES = [
  "Moscow",
  "Lagos",
  "Beijing",
];

const SAFE_COUNTRIES = [
  "India",
];

const FRAUD_COUNTRIES = [
  "Russia",
  "Nigeria",
  "China",
];

function random<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function randomIP() {
  return `${Math.floor(Math.random() * 255)}.${Math.floor(
    Math.random() * 255
  )}.${Math.floor(Math.random() * 255)}.${Math.floor(
    Math.random() * 255
  )}`;
}

function randomDevice() {
  return `DEVICE-${Math.random()
    .toString(36)
    .substring(2, 8)
    .toUpperCase()}`;
}

export async function startSimulation(
  userId: string,
  type: "normal" | "mixed" | "attack",
  duration: number
) {
  const io = getIO();

  const interval = 2000;
  const totalEvents = Math.floor(duration / 2);

  let current = 0;

  io.emit("simulation-started", {
    type,
    duration,
    totalEvents,
  });

  const timer = setInterval(async () => {
    if (current >= totalEvents) {
      clearInterval(timer);

      io.emit("simulation-finished", {
        totalEvents,
      });

      return;
    }

    current++;

    let merchant = "";
    let amount = 0;
    let country = "";
    let city = "";
    let transactionType: TransactionType = TransactionType.UPI;

    // -----------------------------
    // NORMAL TRAFFIC
    // -----------------------------

    if (type === "normal") {
      merchant = random(SAFE_MERCHANTS);

      amount = Math.floor(Math.random() * 5000) + 100;

      country = "India";

      city = random(SAFE_CITIES);

      transactionType = random([
        TransactionType.UPI,
        TransactionType.CARD,
      ]);
    }

    // -----------------------------
    // MIXED TRAFFIC
    // -----------------------------

    else if (type === "mixed") {
      const fraud = Math.random() < 0.2;

      merchant = fraud
        ? random(FRAUD_MERCHANTS)
        : random(SAFE_MERCHANTS);

      amount = fraud
        ? Math.floor(Math.random() * 80000) + 20000
        : Math.floor(Math.random() * 6000) + 100;

      country = fraud
        ? random(FRAUD_COUNTRIES)
        : "India";

      city = fraud
        ? random(FRAUD_CITIES)
        : random(SAFE_CITIES);

      transactionType = fraud
        ? TransactionType.ATM
        : TransactionType.UPI;
    }

    // -----------------------------
    // ATTACK MODE
    // -----------------------------

    else {
      merchant = random(FRAUD_MERCHANTS);

      amount = Math.floor(Math.random() * 90000) + 60000;

      country = random(FRAUD_COUNTRIES);

      city = random(FRAUD_CITIES);

      transactionType = TransactionType.ATM;
    }

    await createTransaction({
      userId,
      amount,
      merchant,
      city,
      country,
      ipAddress: randomIP(),
      deviceId: randomDevice(),
      transactionType,
    });

    io.emit("simulation-progress", {
      current,
      total: totalEvents,
      percent: Math.round((current / totalEvents) * 100),
    });
  }, interval);

  return {
    success: true,
    message: "Simulation started",
  };
}
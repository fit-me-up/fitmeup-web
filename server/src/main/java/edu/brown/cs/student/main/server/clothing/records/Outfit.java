package edu.brown.cs.student.main.server.clothing.records;

public record Outfit(
    Boolean isFullBody,
    Clothing top,
    Clothing bottom,
    Clothing shoe,
    Clothing outerwear,
    Clothing fullbody,
    Clothing accessory) {}

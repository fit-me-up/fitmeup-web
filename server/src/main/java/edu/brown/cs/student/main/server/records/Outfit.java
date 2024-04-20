package edu.brown.cs.student.main.server.records;

public record Outfit(
    Boolean isFullBody,
    Clothing top,
    Clothing bottom,
    Clothing shoe,
    Clothing outerwear,
    Clothing fullbody,
    Clothing accesory1,
    Clothing accesory2
) {}
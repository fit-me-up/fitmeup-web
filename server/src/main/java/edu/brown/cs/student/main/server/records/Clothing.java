package edu.brown.cs.student.main.server.records;

import edu.brown.cs.student.main.server.enums.Category;
import edu.brown.cs.student.main.server.enums.Formality;
import edu.brown.cs.student.main.server.enums.Material;
import edu.brown.cs.student.main.server.enums.Shape;

import java.util.ArrayList;

public record Clothing(
    int id, 
    Category category,
    Shape type,
    Formality formality,
    ArrayList<String> colors, 
    Material material
) {}
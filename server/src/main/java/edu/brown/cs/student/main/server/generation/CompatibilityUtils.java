package edu.brown.cs.student.main.server.generation;

import edu.brown.cs.student.main.server.enums.Formality;
import edu.brown.cs.student.main.server.records.Clothing;

public class CompatibilityUtils{

    public CompatibilityUtils(){

    }

    public double colorBaseComp(Clothing one, Clothing two){
        return 1;
    }

    public double colorValueComp(Clothing one, Clothing two){
        return 1;
    }

    public double materialComp(Clothing one, Clothing two){
        return one.material().compatWith(two.material());
    }

    public double formalityComp(Clothing one, Formality target){
        // correct formality
        if (one.formality() == target){
            return 1;
        }

        // flex when target isn't flex
        else if (one.formality() == Formality.FLEX){
            return 0.8;
        }

        else {
            return 0.3;
        }
    }
}

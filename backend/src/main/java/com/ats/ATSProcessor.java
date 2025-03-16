package com.ats;

import java.util.Arrays;
import java.util.List;

public class ATSProcessor {
    public static int calculateScore(String resume, String jobDesc) {
        List<String> jobKeywords = Arrays.asList(jobDesc.toLowerCase().split("\s+"));
        List<String> resumeWords = Arrays.asList(resume.toLowerCase().split("\s+"));

        int score = 0;
        for (String word : jobKeywords) {
            if (resumeWords.contains(word)) {
                score += 10;
            }
        }
        return score;
    }
}

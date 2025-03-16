package com.ats;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/uploadResume")
public class ResumeServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String resume = request.getParameter("resume");
        String jobDesc = request.getParameter("jobDesc");

        int score = ATSProcessor.calculateScore(resume, jobDesc);

        response.setContentType("application/json");
        response.getWriter().write("{'score': " + score + "}");
    }
}
